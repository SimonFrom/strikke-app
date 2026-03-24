import React, {useState} from 'react';
import {Alert, StyleSheet, Text, Pressable, View, Modal} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Button} from '@/components/ui/button';
import {Trash} from "lucide-react-native";
import {X} from "lucide-react-native";
import {supabase} from '@/utils/supabase';

export default function ModalComponent({id, onDelete}: { id: number; onDelete: (id: number) => void }) {
    const [modalVisible, setModalVisible] = useState(false);

    const deleteProject = async (id: number) => {
        const {error} = await supabase
            .from('projects')
            .delete()
            .eq('id', id)

        if (error) throw error;
        setModalVisible(false);
        onDelete(id);
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.closeButton}>
                                <Button
                                    icon={X}
                                    onPress={() => setModalVisible(false)}
                                    variant="link"
                                    style={{margin: 10, height: 30, width: 30}}>
                                </Button>
                            </View>
                            <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Vil du virkelig slette projektet?</Text>
                            <Button
                                onPress={() => deleteProject(id)}
                                variant="destructive">
                                <Text style={styles.textStyle}>Slet</Text>
                            </Button>
                            </View>
                        </View>

                    </View>
                </Modal>
                <Button
                    onPress={() => setModalVisible(true)}
                    icon={Trash}
                    variant="destructive"
                    style={{height: 30, width: 30}}
                >
                </Button>
            </SafeAreaView>
        </SafeAreaProvider>
    )
        ;
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalContent: {
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
    },
    closeButton: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    button: {
        borderRadius: 50,
        padding: 10,
        elevation: 2,

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

