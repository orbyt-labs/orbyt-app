import React from 'react';
import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import WalletAction from '../../../redux/actions/wallet.action';

const Markets = (props: any) => {
    const { markets } = props;
    
    React.useEffect(() => {
    //    getMarketData();
    }, []);

    const isPositive = (number: string) => {
        if(number.indexOf('-') === 0){
            return false
        }
        return true
    }

    const roundOff = (number: number) => {
        return number.toFixed(2) 
    }

    return (
        <View
            style={{
                flex: 1,
            }}>
            {markets ? (
                <ScrollView
                    style={{
                        backgroundColor:'white',
                        flex: 1,
                        display: 'flex',
                        flexDirection:'column',
                    }}>
                    {
                     markets.map((data: any) => {
                        return(
                            <View
                                key={data.id}
                                style={{
                                    margin: 5,
                                    padding: 10,
                                    backgroundColor:'white',
                                    display: 'flex',
                                    flexDirection:'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    elevation: 20,
                                    shadowColor: '#000000',
                                }}>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection:'row',
                                        alignItems: 'center',
                                        borderRadius: 20
                                    }}>
                                    <Image
                                        source={{uri: data.image}}
                                        style={{
                                            width:50,
                                            height:50,
                                            borderRadius: 50,
                                            marginRight: 10,
                                            backgroundColor:'black'
                                        }}/>
                                    <View>
                                        <Text
                                            style={{
                                                fontFamily: 'SF-Pro-Rounded-Bold',
                                                color:'black',
                                                fontSize: 21,
                                            }}>
                                            {data.id}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: 'SF-Pro-Rounded-Bold',
                                                fontSize: 18,
                                                marginTop: -20,
                                                color: 'grey'   
                                            }}>
                                            {data.symbol}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    >
                                        <Text
                                                style={{
                                                fontFamily: 'SF-Pro-Rounded-Bold',
                                                color:'black',
                                                fontSize: 21,
                                            }}>
                                            {`$ ${roundOff(data.current_price)}`}
                                        </Text>
                                        <Text
                                                style={{
                                                fontFamily: 'SF-Pro-Rounded-Bold',
                                                color: `${isPositive(`${data.market_cap_change_percentage_24h}`) ? "green" :  "red"}`,
                                                fontSize: 21,
                                                marginTop: -20
                                            }}>
                                            {`${roundOff(data.market_cap_change_percentage_24h)} %`}
                                        </Text>
                                </View>
                            </View>
                        )
                     })   
                    }
                </ScrollView>
            ) : (
                <View
                    style={{
                        backgroundColor:'white',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'SF-Pro-Rounded-Bold',
                        }}
                    >
                        LOADING
                    </Text>
                </View>
            )}
        </View>
    );
};

const mapStateToProps = (state: any, props: any) => {
    return { markets: state.markets };
};

export default connect(mapStateToProps)(Markets);
