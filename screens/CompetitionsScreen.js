import React,{useState} from 'react';
import {View, ScrollView, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { usePoints } from './PointsContext'; // Adjust the import path
import { useTheme } from './ThemeContext';


const competitionsData = {
  "ecoFriendlyCompetitions": [
    {
      "name": "Green Clean Challenge",
      "image": "../images/ParksCleaning.jpg",
      "details": "Clean up your local park or beach and win exciting prizes.",
      "location": "Bergville, Spots Complex",
      "points": 10,
      "numberOfParticipants": 50,
      "rewards": "Cash prize, eco-friendly products",
      "date": "2023-12-15"
    },
    {
      "name": "Solar Innovation Contest",
      "image": "../images/Solar.jpg",
      "details": "Create innovative solar-powered devices to solve environmental problems.",
      "location": "Online",
      "points": 6500,
      "numberOfParticipants": 30,
      "rewards": "Scholarships, solar panels",
      "date": "2023-11-10"
    },
    {
      "name": "Recycled Art Exhibition",
      "image": "../images/recycledArt.jpg",
      "details": "Showcase your artistic talent using recycled materials.",
      "location": "Johannesburg, Everard Read Gallery",
      "points": 7500,
      "numberOfParticipants": 20,
      "rewards": "Artistic recognition, exhibition space",
      "date": "2023-11-20"
    },
    {
      "name": "Tree Planting Marathon",
      "image": "../images/treePlanting.jpg",
      "details": "Join a mass tree planting event to combat deforestation.",
      "location": "Johannesburg, Buffelsdraai Reforestation Project, Iqadi",
      "points": 5000,
      "numberOfParticipants": 100,
      "rewards": "Seedlings, environmental awareness",
      "date": "2023-12-22"
    },
    {
      "name": "Energy-Saving Home Challenge",
      "image": "../images/saveEnergy.jpg",
      "details": "Reduce your home's energy consumption and win energy-efficient appliances.",
      "location": "Your Home",
      "points": 8000,
      "numberOfParticipants": 200,
      "rewards": "Energy-efficient appliances, energy audit",
      "date": "2023-12-05"
    },
    {
      "name": "Bike to Work Week",
      "image": "../images/bikeToWork.jpg",
      "details": "Participate in a week-long challenge to commute to work using bicycles.",
      "location": "Your Commute Route",
      "points": 3000,
      "numberOfParticipants": 500,
      "rewards": "Bike accessories, fitness gear",
      "date": "2023-11-18"
    },
    {
      "name": "Ocean Conservation Dive",
      "image": "../images/dive.jpg",
      "details": "Contribute to coral reef restoration and marine life conservation while scuba diving.",
      "location": "Durban, Diving Spots Worldwide",
      "points": 12000,
      "numberOfParticipants": 50,
      "rewards": "Dive gear, marine conservation trip",
      "date": "2024-01-30"
    },
    {
      "name": "Eco-Friendly Fashion Show",
      "image": "../images/fashion.jpg",
      "details": "Showcase sustainable and eco-friendly fashion designs on the runway.",
      "location": "Durban, Fashion Show Venue",
      "points": 9000,
      "numberOfParticipants": 15,
      "rewards": "Fashion scholarships, eco-friendly clothing",
      "date": "2023-11-12"
    },
    {
      "name": "Clean Energy Hackathon",
      "image": "../images/clean.jpg",
      "details": "Develop innovative tech solutions for clean and renewable energy sources.",
      "location": "Johannesburg, Tech Hub",
      "points": 15000,
      "numberOfParticipants": 40,
      "rewards": "Startup funding, clean energy patents",
      "date": "2023-12-01"
    },
    {
      "name": "Upcycled Garden Contest",
      "image": "../images/up.webp",
      "details": "Transform waste materials into beautiful and functional garden features.",
      "location": "Your Garden",
      "points": 6000,
      "numberOfParticipants": 25,
      "rewards": "Gardening tools, eco-friendly seeds",
      "date": "2024-01-30"
    },
    {
      "name": "Green Tech Showcase",
      "image": "../images/green.jpg",
      "details": "Demonstrate and present eco-friendly technology and innovations.",
      "location": "Johannesburg, Technology Convention Center",
      "points": 11000,
      "numberOfParticipants": 30,
      "rewards": "Investment opportunities, tech partnerships",
      "date": "2024-01-08"
    },
    {
      "name": "Zero-Waste Cooking Competition",
      "image": "../images/zero.jpg",
      "details": "Prepare delicious dishes using zero-waste principles and sustainable ingredients.",
      "location": "East London, Culinary School",
      "points": 7000,
      "numberOfParticipants": 20,
      "rewards": "Cooking classes, zero-waste kitchen supplies",
      "date": "2023-12-28"
    },
    {
      "name": "Community Clean Energy Drive",
      "image": "../images/African-CleanEnergy3-rs.jpg",
      "details": "Mobilize your community to adopt clean energy practices and win community rewards.",
      "location": "Your Community",
      "points": 10000,
      "numberOfParticipants": 300,
      "rewards": "Community grants, solar installations",
      "date": "2023-12-15"
    },
    {
      "name": "Eco-Quiz Challenge",
      "image": "../images/quiz.jpg",
      "details": "Test your knowledge on environmental issues and compete in a quiz competition.",
      "location": "Online",
      "points": 4000,
      "numberOfParticipants": 1000,
      "rewards": "Eco-friendly books, eco-tours",
      "date": "2024-01-01"
    },
    {
      "name": "Sustainable Farming Fair",
      "image": "../images/mtata.jpg",
      "details": "Showcase sustainable farming practices and products at a local fair.",
      "location": "Emthatha. Local Fairgrounds",
      "points": 8000,
      "numberOfParticipants": 35,
      "rewards": "Farming equipment, agricultural scholarships",
      "date": "2024-01-22"
    }
  ]
};

const CompetitionsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [upcomingCompetitions, setUpcomingCompetitions] = useState(competitionsData.ecoFriendlyCompetitions);
  const [activeCompetitions, setActiveCompetitions] = useState([]);
  const { userPoints, setUserPoints } = usePoints();

  const openModal = (competition) => {
    setSelectedCompetition(competition);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCompetition(null);
    setModalVisible(false);
  };

   const handleStartCompetition = () => {
    if (selectedCompetition) {
      if (userPoints >= selectedCompetition.points) {
        const newPoints = userPoints - selectedCompetition.points;
        setUserPoints(newPoints);

        // Move the competition from upcoming to active
        setActiveCompetitions((prevActiveCompetitions) => [
          ...prevActiveCompetitions,
          selectedCompetition,
        ]);

        // Remove the competition from upcoming
        setUpcomingCompetitions((prevUpcomingCompetitions) =>
          prevUpcomingCompetitions.filter((competition) => competition !== selectedCompetition)
        );

        // Display a success message
        alert(`You've started the ${selectedCompetition.name} competition!`);

        // Close the modal
        closeModal();
      } else {
        // If the user doesn't have enough points, display an error message
        alert(`You don't have enough points for the ${selectedCompetition.name} competition.`);
      }
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'upcoming' && styles.activeTabButton,
          ]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.tabText, { color: theme.textColor }]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'active' && styles.activeTabButton,
          ]}
          onPress={() => setSelectedTab('active')}
        >
          <Text style={[styles.tabText, { color: theme.textColor }]}>Active</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'upcoming' && (
        <>
          {upcomingCompetitions.map((competition, index) => (
            <TouchableOpacity
              key={index}
              style={styles.competitionContainer}
              onPress={() => openModal(competition)}
            >
       <Image source={require('./images/mtata.jpg')} style={styles.backgroundImage} />

              <View style={styles.competitionContent}>
                <Text style={styles.competitionName}>{competition.name}</Text>
                <Text style={styles.competitionDetails}>{competition.details}</Text>
                <Text style={styles.competitionParticipants}>
                  Participants: {competition.numberOfParticipants}
                </Text>
                <Text style={styles.competitionLocation}>Location:{competition.location}</Text>
                <Text style={styles.competitionDate}>Date: {competition.date}</Text>
                <Text style={styles.competitionRewards}>Rewards: {competition.rewards}</Text>
                <Text style={styles.competitionPoints}>Points: {competition.points}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}

      {selectedTab === 'active' && (
        <>
          {activeCompetitions.map((competition, index) => (
            <View key={index} style={styles.competitionContainer}>
              <Image source={require('./images/mtata.jpg')} style={styles.backgroundImage} />
              <View style={styles.competitionContent}>
                <Text style={styles.competitionName}>{competition.name}</Text>
                <Text style={styles.competitionDetails}>{competition.details}</Text>
                <Text style={styles.competitionParticipants}>
                  Participants: {competition.numberOfParticipants}
                </Text>
                <Text style={styles.competitionLocation}>Location:{competition.location}</Text>
                <Text style={styles.competitionDate}>Date: {competition.date}</Text>
                <Text style={styles.competitionRewards}>Rewards: {competition.rewards}</Text>
                <Text style={styles.competitionPoints}>Points: {competition.points}</Text>
              </View>
            </View>
          ))}
        </>
      )}

      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        {selectedCompetition && (
          <View style={[styles.modalContent, { backgroundColor: theme.backgroundColor }]}>
            <Text style={styles.competitionName}>{selectedCompetition.name}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleStartCompetition} style={styles.startButton}>
                <Text style={[styles.buttonText, {color: theme.buttonColor }]}>Start Challenge</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={[styles.buttonText, { color: theme.buttonColor }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    top:0,
  },
  tabButton: {
    padding: 10,
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: 'green',
  },
  tabText: {
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  competitionContainer: {
    backgroundColor: 'lightgray',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
  },
  competitionContent: {
    padding: 16,
  },
  competitionName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  competitionDetails: {
    marginTop: 8,
    fontSize: 14,
  },
  competitionParticipants: {
    fontWeight: 'bold',
  },
  competitionLocation: {
    fontWeight: 'bold',
  },
  competitionDate: {
    fontWeight: 'bold',
  },
  competitionRewards: {
    fontWeight: 'bold',
  },
  competitionPoints: {
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:60,
  },
  modalCloseButton: {
    fontSize: 16,
    color: 'blue', // Customize the color
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  startButton: {
    padding: 10,
    borderRadius: 10,
     backgroundColor: 'green',
     margin:20,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    margin:20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CompetitionsScreen;