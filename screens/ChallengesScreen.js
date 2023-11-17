import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useTheme } from './ThemeContext';
import { theme } from "./Theme";
import Ionicons from '@expo/vector-icons/Ionicons'



function ChallengesScreen({navigation}) {
  const theme = useTheme();
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [showCompletedChallenges, setShowCompletedChallenges] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [userCompletedChallenges, setUserCompletedChallenges] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  useEffect(() => {
    const fetchChallenges = async () => {
      const challengesCollection = collection(db, "Challenges");
      const challengesQuery = query(challengesCollection);
      const challengesSnapshot = await getDocs(challengesQuery);

      const allChallenges = challengesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter completed challenges and ongoing challenges
      const completed = allChallenges.filter((challenge) =>
        userCompletedChallenges.includes(challenge.id)
      );

      const ongoing = allChallenges.filter(
        (challenge) => !userCompletedChallenges.includes(challenge.id)
      );

      setCompletedChallenges(completed);
      setChallenges(ongoing);
    };

    fetchChallenges();
  }, [userCompletedChallenges]);

  const markChallengeAsDone = async (id, score) => {
    const challenge = challenges.find((c) => c.id === id);

    if (!challenge) {
      console.error("Challenge not found:", id);
      return;
    }

    const challengeDocRef = doc(db, "Challenges", id);

    try {
      // Check if the document exists before updating
      const docSnapshot = await getDoc(challengeDocRef);

      if (docSnapshot.exists()) {
        if (!challenge.completed) {
          await updateDoc(challengeDocRef, {
            completed: true,
          });

          // Update the user's score and completed challenges
          setUserScore((prevScore) => prevScore + score);
          setUserCompletedChallenges((prevCompletedChallenges) => [
            ...prevCompletedChallenges,
            id,
          ]);

          // Challenge is now completed, move it to completedChallenges
          setChallenges((prevChallenges) =>
            prevChallenges.filter((c) => c.id !== id)
          );
          setCompletedChallenges((prevCompletedChallenges) => [
            ...prevCompletedChallenges,
            challenge,
          ]);
        }
      } else {
        console.error("Challenge document not found:", id);
      }
    } catch (error) {
      console.error("Error updating challenge:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.titleColor }]}>Challenges</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
         <Ionicons name="person" size={24} color={theme.textColor} />

        </TouchableOpacity>
      </View>
      {showCompletedChallenges && (
        <FlatList
          data={completedChallenges}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.challengeItem}>
              <Text style={styles.challengeTitle}>{item.title}</Text>
              <Text>Score: {item.score}</Text>
              <Text style={[styles.completedLabel, { color: "green" }]}>
                Completed
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      {!showCompletedChallenges && (
        <FlatList
          data={showAllChallenges ? challenges : challenges.slice(0, 3)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.challengeItem}
              onPress={() => markChallengeAsDone(item.id, item.score)}
              disabled={
                item.completed || userCompletedChallenges.includes(item.id)
              }
            >
              <Text style={styles.challengeTitle}>{item.title}</Text>
              <Text>
                <Text style={{ color: "black", fontSize: 18 }}>Score: </Text>
                <Text style={{ color: "green", fontSize: 24 }}>
                  {item.score}
                </Text>
              </Text>
              {item.completed && (
                <Text style={[styles.completedLabel, { color: "green" }]}>
                  Completed
                </Text>
              )}
            </TouchableOpacity>
          )}
          ListFooterComponent={
            !showAllChallenges &&
            challenges.length > 3 && (
              <TouchableOpacity
                onPress={() => setShowAllChallenges(true)}
                style={styles.showAllButton}
              >
                <Text>Show All Challenges</Text>
              </TouchableOpacity>
            )
          }
        />
      )}
      <TouchableOpacity
        onPress={() => setShowCompletedChallenges(!showCompletedChallenges)}
        style={styles.showCompletedButton}
      >
        <Text>
          Show {showCompletedChallenges ? "Ongoing" : "Completed"} Challenges
        </Text>
      </TouchableOpacity>
      <Text style={styles.userScore}>Your Score: {userScore}</Text>
      <Leaderboard userScore={userScore} />
    </View>
  );
}

const Leaderboard = ({ userScore }) => {
  const leaderboardData = [
    { username: 'User1', score: 500 },
    { username: 'User2', score: 450 },
    { username: 'User3', score: 400 },
    { username: 'User4', score: 350 },
    { username: 'User5', score: 300 },
  ];

  leaderboardData.push({ username: 'You', score: userScore });

  // Sort the leaderboard data by score in descending order
  leaderboardData.sort((a, b) => b.score - a.score);

  // Calculate a color gradient from yellow to green based on position
  const calculateColor = (index) => {
  const r = Math.floor((255 * index) / leaderboardData.length); // Red value decreases
  const g = 255; // Green value remains high
  const b = 0; // Blue value remains constant
  return `rgb(${r},${g},${b})`;
};

  const renderBadge = (position) => {
    let badgeIcon, badgeColor;

    switch (position) {
      case 1:
        badgeIcon = '🥇';
        badgeColor = 'gold';
        break;
      case 2:
        badgeIcon = '🥈';
        badgeColor = 'silver';
        break;
      case 3:
        badgeIcon = '🥉';
        badgeColor = 'bronze';
        break;
      default:
        return null;
    }

    return (
      <Text style={{ fontSize: 18, color: badgeColor }}>
        {badgeIcon}
      </Text>
    );
  };

  return (
    <View style={styles.leaderboardContainer}>
      <Text style={styles.leaderboardTitle}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.leaderboardItem,
              { backgroundColor: calculateColor(index) },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {index < 3 && renderBadge(index + 1)}
              <Text style={styles.rank}>{index + 1}</Text>
            </View>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.score}>{item.score} Points</Text>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.backgroundColor, // Light blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.textColor, // Dark green text color
  },
  challengeItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 8,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red', // Dark green text color
  },
  completedLabel: {
    color: '#00C853', // Green completion label
  },
  showAllButton: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  userScore: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: theme.textColor, 
  },
  leaderboardContainer: {
    marginTop: 24,
  },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.titleColor,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  username: {
    flex: 1,
    fontSize: 18,
    marginRight: 8,
  },
  score: {
    fontSize: 18,
  },
  showCompletedButton: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default ChallengesScreen;