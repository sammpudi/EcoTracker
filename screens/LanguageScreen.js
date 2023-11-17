import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext';

const LanguageScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    // You can perform additional actions when a language is selected, e.g., set it as the app language.
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.sectionTitleColor }]}>Select a Language</Text>
      
      <TouchableOpacity
        style={[styles.languageOption, selectedLanguage === 'English' ? styles.selected : null]}
        onPress={() => selectLanguage('English')}
      >
        <Text>{'English'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.languageOption, selectedLanguage === 'Spanish' ? styles.selected : null]}
        onPress={() => selectLanguage('Spanish')}
      >
        <Text>{'Spanish'}</Text>
      </TouchableOpacity>

      {/* Add more language options as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageOption: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: 'lightgreen', // Change to your selected language color
    borderColor: 'green', // Change to your selected language color
  },
});

export default LanguageScreen;
