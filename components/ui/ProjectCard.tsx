import {Project} from "@/types/project";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {FlatList, Linking, StyleSheet, Image, Pressable} from "react-native";
import {Text} from '@/components/ui/text';
import {View} from '@/components/ui/view'
import {Button} from '@/components/ui/button'

import {Route, router} from "expo-router";


export function ProjectCard({projects}: { projects: Project[] }) {

    // Nav
    const showProject = (id: number) => {
        router.push(`/projects/${id}` as Route);
        console.log(id);
    }


    if (projects.length === 0) {
        return <Text variant={"caption"}>Ingen projekter oprettet...</Text>;
    }

    return (
        <FlatList
            data={projects}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{gap: 16, padding: 24}}
            renderItem={({item}) => (
                <Card>
                    <CardTitle style={styles.cardTitle}>{item.headline}</CardTitle>
                    <Pressable onPress={() => showProject(item.id)}>
                        <Image
                            source={{uri: item.photo}}
                            style={{width: '100%', height: 200}}
                            resizeMode="cover"
                        />
                        <CardContent>
                            <Button style={{
                                marginVertical: 5,
                                marginHorizontal: 'auto',
                                width: 135,
                                height: 30,
                                backgroundColor: 'white',
                            }}>
                                <Text onPress={() => Linking.openURL(item.recipe)}>Opskrift</Text>
                            </Button>
                            <View style={{flexDirection: 'row', gap: 8}}>
                                {item.category?.map((cat) => (
                                    <Text key={cat}>#{cat}</Text>
                                ))}
                            </View>
                        </CardContent>
                    </Pressable>
                </Card>
            )}
        />
    );
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginTop: 'auto'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '500',

    }
})