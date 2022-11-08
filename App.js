import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default function App() {
  //permisos
  const [HasPermisos,SetHasPermisos]=useState(null);
  //escaner
  const [escaner,setEscaner]=useState(false);


  useEffect(()=>{
    const getEscanerpermisos=async ()=>{
    const {status}=await BarCodeScanner.requestPermissionsAsync();
    SetHasPermisos(status==='granted');
  };
  getEscanerpermisos();
},[]);


const conductorescaner=({type,data})=>{
  setEscaner(true);
  alert(`Codigo ${type} y el dato ${data}`);
};

if(HasPermisos==null){
return <Text>rr camara </Text>
}
if (HasPermisos==false) {
  return <Text>No permisos </Text>
}

  return (
    <View style={styles.container}>
      <BarCodeScanner
      onBarCodeScanned={escaner? undefined: handleBarCodeScanned}
      />
      {escaner && <Button title={'Escanear'} onPress={()=>setEscaner(false)}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
