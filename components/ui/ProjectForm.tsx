import {Input, GroupedInput, GroupedInputItem} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import { Pencil, BookOpen, Terminal, Layers, Shirt, Tag, X, Camera } from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Route, Router, useLocalSearchParams, useRouter} from "expo-router"
import {Project, projectsData} from '../../types/project';

export function ProjectForm({headline} : {headline: string}) {
    const router = useRouter();
    const { id } = useLocalSearchParams()
    const headLine = headline ?? "Opret et nyt projekt"
    const [project, setProject] = useState<Project>();

    const getProject = async (id: number) => {

        try {
            const myProject = projectsData.find((item) => item.id === id);
            setProject(myProject);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getProject(+id)
    })


    // Save
    const handleSave = () => {
        router.push('/' as Route);
    }


    return (
        <SafeAreaView style={{flex: 1, padding: 24, gap: 16}}>
            <ScrollView style={{flex: 1, marginBottom: 4}}>
            <Button
                variant={'destructive'}
                size={'icon'}
                icon={X}
                style={{marginLeft: '80%'}}
                onPress={() => router.push('/')}></Button>
            <GroupedInput title={headLine}>
                <GroupedInputItem
                    label='Titel'
                    placeholder='Navn på projekt'
                    icon={Pencil}
                    value={project?.headline}
                />
                <GroupedInputItem
                    label='Opskrift'
                    placeholder='Link til opskrift'
                    icon={BookOpen}
                    keyboardType='url'
                    value={project?.recipe}
                />
                <GroupedInputItem
                    label='Pindlængde'
                    placeholder='40 cm'
                    icon={Terminal}
                    value={project?.needles.length.toString()}
                />
                <GroupedInputItem
                    label='Pindtype'
                    placeholder='Rundpind'
                    icon={Terminal}
                    value={project?.needles.type}
                />
                <GroupedInputItem
                    label='Pind dia'
                    placeholder='5mm'
                    icon={Terminal}
                    value={project?.needles.diameter.toString()}
                />
                <GroupedInputItem
                    label='Garn mærke'
                    icon={Layers}
                    placeholder='Drops'
                    value={project?.materials.make}
                />
                <GroupedInputItem
                    label='Garn model'
                    icon={Layers}
                    placeholder='Flora'
                    value={project?.materials.model}
                />
                <GroupedInputItem
                    label='Farve'
                    icon={Layers}
                    placeholder='Blå'
                    value={project?.materials.color}
                />
                <GroupedInputItem
                    label='Garn type'
                    icon={Layers}
                    placeholder='100 % uld'
                    value={project?.materials.type}
                />
                <GroupedInputItem
                    label='Forbrug'
                    icon={Layers}
                    placeholder='1.5 nøgle'
                    value={project?.materials.amount.toString()}
                />
                <GroupedInputItem
                    label='Vejledning'
                    placeholder='Håndvask 30°'
                    icon={Shirt}
                    value={project?.washingRec}
                />
                <GroupedInputItem
                    label='Kategori'
                    placeholder='Hue, vinter'
                    icon={Tag}

                />
                <GroupedInputItem
                label='Billede'
                icon={Camera}
                value={project?.photo}/>

            </GroupedInput>
            </ScrollView>
            <Button onPress={() => handleSave()}>Gem</Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {}
})
