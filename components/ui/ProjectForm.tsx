import {Input, GroupedInput, GroupedInputItem} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import { Pencil, BookOpen, Terminal, Layers, Palette, Shirt, Tag, X, Camera } from 'lucide-react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Route, Router, useRouter} from "expo-router"

export function ProjectForm({headline} : {headline: string}) {
    const router = useRouter();
    const headLine = headline ?? "Opret et nyt projekt"


    // Save
    const handleSave = () => {
        router.push('/' as Route);
    }


    return (
        <SafeAreaView style={{flex: 1, padding: 24, gap: 16}}>
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
                />
                <GroupedInputItem
                    label='Opskrift'
                    placeholder='Link til opskrift'
                    icon={BookOpen}
                    keyboardType='url'
                />
                <GroupedInputItem
                    label='Pinde'
                    placeholder='f.eks. Rundpind 5mm'
                    icon={Terminal}
                />
                <GroupedInputItem
                    label='Garn'
                    icon={Layers}
                />
                <GroupedInputItem
                    label='Farve'
                    icon={Palette}
                />
                <GroupedInputItem
                    label='Vejledning'
                    placeholder='f.eks. Håndvask 30°'
                    icon={Shirt}
                />
                <GroupedInputItem
                    label='Kategori'
                    placeholder='f.eks. hue, vinter'
                    icon={Tag}
                />
                <GroupedInputItem
                label='Billede'
                icon={Camera}
                />



            </GroupedInput>
            <Button onPress={() => handleSave()}>Gem</Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {}
})
