import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Picker, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker'; // Import the library
import { DonationsContext } from './DonationsContext';

const DonateScreen = () => {
  const { addDonation } = useContext(DonationsContext);
  const [newDonation, setNewDonation] = useState({
    itemType: 'Appliances',
    itemName: '',
    description: '',
    purchasePrice: '0', 
    yearBought: '',
    image: null,
  });

  const handleImageUpload = () => {
   
    ImagePicker.showImagePicker(
      {
        title: 'Select an Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      (response) => {
        if (response.didCancel) {
          // User cancelled the image picker
        } else if (response.error) {
          // Error occurred during image selection
        } else {
          // Image selected successfully, set the image URI
          setNewDonation({ ...newDonation, image: response.uri });
        }
      }
    );
  };

  const handleAddDonation = () => {
    // Validate the data as needed before adding it
    if (newDonation.itemName && newDonation.description && newDonation.purchasePrice && newDonation.yearBought) {
      addDonation(newDonation);
      setNewDonation({
        itemType: 'Appliances',
        itemName: '',
        description: '',
        purchasePrice: '0',
        yearBought: '',
        image: null,
      });
    } else {
      // Handle validation errors or show an alert
    }
  };

  return (
    <View>
      <Text>Select Item Type</Text>
     
      
      <Picker
            selectedValue={newDonation.itemType}
            onValueChange={(itemType) => setNewDonation({ ...newDonation, itemType })}>
            <Picker.Item label="Male" value="Male" color={theme.titleColor} />
            <Picker.Item label="Female" value="Female" color={theme.titleColor} />
            <Picker.Item label="Confused" value="Confused" color={theme.titleColor} />
          </Picker>

      <Text>Item Name</Text>
      <TextInput
        placeholder="Enter item name"
        value={newDonation.itemName}
        onChangeText={(text) => setNewDonation({ ...newDonation, itemName: text })}
      />

      <Text>Description</Text>
      <TextInput
        placeholder="Enter description"
        value={newDonation.description}
        onChangeText={(text) => setNewDonation({ ...newDonation, description: text })}
      />

      <Text>Purchase Price</Text>
      <TextInput
        placeholder="Enter purchase price"
        value={newDonation.purchasePrice}
        onChangeText={(text) => setNewDonation({ ...newDonation, purchasePrice: text })}
        keyboardType="numeric"
      />

      <Text>Year Bought</Text>
      <TextInput
        placeholder="Enter year bought"
        value={newDonation.yearBought}
        onChangeText={(text) => setNewDonation({ ...newDonation, yearBought: text })}
        keyboardType="numeric"
      />

      <Text>Upload an Image</Text>
      {newDonation.image && <Image source={{ uri: newDonation.image }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity onPress={handleImageUpload}>
        <Text>Choose an Image</Text>
      </TouchableOpacity>

      <Button title="Donate" onPress={handleAddDonation} />
    </View>
  );
};

export default DonateScreen;

