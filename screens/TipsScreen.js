import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { collection,  getDocs,  } from "firebase/firestore";
import { db } from "../config/firebase";
import { useTheme } from './ThemeContext';
import tipsData from './Tips.json';

function Tips() {
  const [randomTips, setRandomTips] = useState([]);
  const { theme } = useTheme();



  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const fetchTipsFromFirestore = async () => {
      const tipsCollection = collection(db, "Tips");

      try {
        const tipsSnapshot = await getDocs(tipsCollection);
        const tipsData = tipsSnapshot.docs.map((doc) => doc.data());
        console.log("Tips Data:", tipsData); 

        const shuffledTips = shuffleArray(tipsData);
        console.log("Shuffled Tips:", shuffledTips); 

        const selectedTips = shuffledTips.slice(0, 10);
        console.log("Selected Tips:", selectedTips); 

        setRandomTips(selectedTips);
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    };

    fetchTipsFromFirestore();
  }, []);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.backgroundColor,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.titleColor,
    },
    tip: {
      fontSize: 18,
      marginBottom: 12,
      color: theme.textColor, 
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Today's Tips</Text>
      {randomTips.map((tip) => (
        <Text key={tip.id || Math.random()} style={styles.tip}>
          - {tip.Text}
        </Text>
      ))}
    </ScrollView>
  );
}

export default Tips;