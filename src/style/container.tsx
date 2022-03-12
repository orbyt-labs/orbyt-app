import { StyleSheet } from 'react-native'

export const container = StyleSheet.create({
    defaultContainer:{
        width: '100%', 
        height:'100%',
        backgroundColor: 'black',
        color: 'white'
    },
    loadingContainer:{
        width: '100%', 
        height:'100%',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
        
    }
});

 