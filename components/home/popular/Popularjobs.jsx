import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './popularjobs.style'
import { useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'

import useFetch from '../../../hooks/useFetch'

const Popularjobs = () => {

    const router = useRouter()
    const {data,error,isLoading} = useFetch('search',{
        query: 'React developer',
        num_pages:1
    })

    const [selectedJob,setSelectJob] = useState()

    const handleCardPress = (item) => {
        router.push(`/job-details/${item.job_id}`)
        setSelectJob(item.job_id)
    }

    console.log(data)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size={SIZES.large} color={COLORS.primary}/>
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <FlatList
                        data={data}
                        renderItem={({item})=>(
                            <PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress}/>
                        )}
                        keyExtractor={item => item?.job_id}
                        contentContainerStyle={{columnGap:SIZES.medium}}
                        horizontal
                    />
                )}
            </View>
        </View>
    )
}

export default Popularjobs