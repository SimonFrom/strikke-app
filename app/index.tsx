import {Text} from '@/components/ui/text';
import {View} from '@/components/ui/view';
import {Button} from '@/components/ui/button';
import {SearchBar} from "@/components/ui/searchbar";
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Project, projectsData} from "@/types/project";
import {ProjectCard} from "@/components/ui/ProjectCard";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {PlusIcon} from "lucide-react-native";
import {Router, useRouter} from "expo-router";
import {supabase} from "@/utils/supabase";


export default function HomeScreen() {

    const router = useRouter();

    // Search bar
    const [searchQuery, setSearchQuery] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = projects.filter((project: Project) =>

            project.headline.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProjects(filtered);
    }
    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        const {data, error} = await supabase
            .from("projects")
            .select('*')

        console.log('data:', data)
        console.log('error:', error)

        if (error) return error;
        if (data) {
            setFilteredProjects(data);
            setProjects(data);
        }
    }


    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SafeAreaView style={{flex: 1, padding: 24, gap: 16}}>
                <Text variant={"heading"}>Strikke Appen</Text>
                <ProjectCard projects={filteredProjects}></ProjectCard>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <SearchBar
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        onSearch={handleSearch}
                        containerStyle={{width: '70%'}}
                    />

                    <Button
                        size={"icon"}
                        icon={PlusIcon}
                        animation={true}
                        onPress={() => router.push({
                            pathname: '/projects/[id]',
                            params: {headline: 'Opret et nyt projekt'}
                        })}></Button>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
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
    },
    searchbar: {
        backgroundColor: 'transparent',
        width: '70%',
    }

})
