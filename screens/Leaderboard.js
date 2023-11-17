import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Sample leaderboard data (replace with your actual data)
const leaderboardData = [
  { username: 'User1', score: 500 },
  { username: 'User2', score: 450 },
  { username: 'User3', score: 400 },
  { username: 'User4', score: 350 },
  { username: 'User5', score: 300 }
];

function Leaderboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.leaderboardItem}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.score}>{item.score} Points</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
});

export default Leaderboard;
