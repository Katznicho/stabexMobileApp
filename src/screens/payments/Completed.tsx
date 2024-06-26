import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import { PAYMENT_STATUS } from '../utils/constants/constants';
import useFetchInfinite from '../../hooks/useFetchInfinite';
import { USERPAYMENTS } from '../utils/constants/routes';
import { generalStyles } from '../utils/generatStyles';
import PaymentFlatList from '../../components/PaymentFlatList';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
import EmptyContainer from '../../components/EmptyContainer';


const Completed = () => {

    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite(PAYMENT_STATUS.COMPLETED, USERPAYMENTS, PAYMENT_STATUS.COMPLETED);
   

    //flat the data
    // const flattenedData = data?.pages.flatMap(page => page.results) || [];
    const paymentData = data?.pages.flatMap(page => page.data);

    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== paymentData?.length) return fetchNextPage()
    };



    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>
            {
                data && paymentData?.length === 0 &&
                <View style={[generalStyles.centerContent, styles.viewStyles]} >
                    <EmptyContainer
                        title={'You dont have any completed payments'}
                    />


                </View>
            }
            <PaymentFlatList
                paymentData={paymentData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />

        </SafeAreaView >
    )
}

export default Completed

const styles = StyleSheet.create({

    viewStyles: {
        marginHorizontal: 10,
        marginVertical: 10
    },
})

