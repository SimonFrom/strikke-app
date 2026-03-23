import {GroupedInput, GroupedInputItem} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import { Pencil, BookOpen, Terminal, Layers, Shirt, Tag, X, Image } from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Route, useLocalSearchParams, useRouter} from "expo-router"
import {Project} from '../../types/project';
import {supabase} from "@/utils/supabase";
import { Camera } from '@/components/ui/camera';


import {Text} from "@/components/ui/text";

export function ProjectForm({headline} : {headline: string}) {
    const router = useRouter();
    const { id } = useLocalSearchParams()
    const isEditing = !!id
    const [isCameraOpen, setCameraOpen] = useState(false)
    const headLine = headline ?? "Opret et nyt projekt"
    const [project, setProject] = useState<Project | null>(null);
    const [form, setForm] = useState({
        headline: '',
        photo: '',
        recipe: '',
        tension: '',
        washing_rec: '',
        category: [],
        notes: '',
        // needles og yarn som separate objekter
        needles: {
            length: 0,
            type: '',
            diameter: 0,
        },
        materials: {
            make: '',
            model: '',
            type: '',
            color: '',
            amount: 0,
        }
    })
    const updateForm = (key: keyof typeof form, value: any) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const updateNested = <T extends 'needles' | 'materials'>(
        parent: T,
        key: keyof typeof form[T],
        value: any
    ) => {
        setForm(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [key]: value }
        }))
    }

    const handleCapture = async (uri: string) => {
        const fileName = `${Date.now()}.jpg`


        const formData = new FormData()
        formData.append('file', {
            uri: uri,
            name: fileName,
            type: 'image/jpeg',
        } as any)

        const { error } = await supabase.storage
            .from('project-images')
            .upload(fileName, formData, { contentType: 'image/jpeg' })

        if (error) return console.error(error)

        const { data: { publicUrl } } = supabase.storage
            .from('project-images')
            .getPublicUrl(fileName)

        updateForm('photo', publicUrl)
        setCameraOpen(false)
    }

    useEffect(() => {
        if (isEditing) {
            getProject()
        }
    }, [])


    const getProject = async () => {
        const {data, error} = await supabase
            .from('projects')
            .select('*, needles(*), materials(*)')
            .eq('id', id)
            .single()

        if (error) return error;
        if (data) {
            setProject(data)
            // 👇 sæt form-state med data fra databasen
            setForm({
                headline: data.headline,
                photo: data.photo,
                recipe: data.recipe,
                tension: data.tension,
                washing_rec: data.washing_rec,
                category: data.category,
                notes: data.notes,
                needles: data.needles,
                materials: data.materials,
            })
        }
    }




    // Save
    const handleSave = async () => {
        if (isEditing) {
            // Opdater eksisterende needles og yarn
            const { error: needlesError } = await supabase
                .from('needles')
                .update(form.needles)
                .eq('id', project?.needles.id)

            if (needlesError) return console.error(needlesError)

            const { error: yarnError } = await supabase
                .from('yarn')
                .update(form.materials)
                .eq('id', project?.materials.id)

            if (yarnError) return console.error(yarnError)

            const { error: projectError } = await supabase
                .from('projects')
                .update({
                    headline: form.headline,
                    photo: form.photo,
                    recipe: form.recipe,
                    tension: form.tension,
                    washing_rec: form.washing_rec,
                    category: form.category,
                    notes: form.notes,
                })
                .eq('id', id)

            if (projectError) return console.error(projectError)

        } else {
            // Opret nye needles og yarn
            const { data: needlesData, error: needlesError } = await supabase
                .from('needles')
                .insert(form.needles)
                .select()
                .single()

            if (needlesError) return console.error(needlesError)

            const { data: yarnData, error: yarnError } = await supabase
                .from('yarn')
                .insert(form.materials)
                .select()
                .single()

            if (yarnError) return console.error(yarnError)

            const { error: projectError } = await supabase
                .from('projects')
                .insert({
                    headline: form.headline,
                    photo: form.photo,
                    recipe: form.recipe,
                    tension: form.tension,
                    washing_rec: form.washing_rec,
                    category: form.category,
                    notes: form.notes,
                    needles: needlesData.id,
                    materials: yarnData.id,
                })

            if (projectError) return console.error(projectError)
        }

        router.push('/')
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
                    value={form.headline}
                    onChangeText={(val) => updateForm('headline', val)}
                />
                <GroupedInputItem
                    label='Opskrift'
                    placeholder='Link til opskrift'
                    icon={BookOpen}
                    keyboardType='url'
                    value={form.recipe}
                    onChangeText={(val) => updateForm('recipe', val)}
                />
                <GroupedInputItem
                    label='Pindlængde'
                    placeholder='40 cm'
                    icon={Terminal}
                    value={form.needles.length.toString()}
                    onChangeText={(val) => updateNested('needles', 'length', Number(val))}
                />
                <GroupedInputItem
                    label='Pindtype'
                    placeholder='Rundpind'
                    icon={Terminal}
                    value={form.needles.type}
                    onChangeText={(val) => updateNested('needles', 'type', val)}
                />
                <GroupedInputItem
                    label='Pind dia'
                    placeholder='5mm'
                    icon={Terminal}
                    value={form.needles.diameter.toString()}
                    onChangeText={(val) => updateNested('needles', 'diameter', Number(val))}
                />
                <GroupedInputItem
                    label='Garn mærke'
                    icon={Layers}
                    placeholder='Drops'
                    value={form.materials.make}
                    onChangeText={(val) => updateNested('materials', 'make', val)}
                />
                <GroupedInputItem
                    label='Garn model'
                    icon={Layers}
                    placeholder='Flora'
                    value={form.materials.model}
                    onChangeText={(val) => updateNested('materials', 'model', val)}
                />
                <GroupedInputItem
                    label='Farve'
                    icon={Layers}
                    placeholder='Blå'
                    value={form.materials.color}
                    onChangeText={(val) => updateNested('materials', 'color', val)}
                />
                <GroupedInputItem
                    label='Garn type'
                    icon={Layers}
                    placeholder='100 % uld'
                    value={form.materials.type}
                    onChangeText={(val) => updateNested('materials', 'type', val)}
                />
                <GroupedInputItem
                    label='Forbrug'
                    icon={Layers}
                    placeholder='1.5 nøgle'
                    value={form.materials.amount.toString()}
                    onChangeText={(val) => updateNested('materials', 'amount', Number(val))}
                />
                <GroupedInputItem
                    label='Vejledning'
                    placeholder='Håndvask 30°'
                    icon={Shirt}
                    value={form.washing_rec}
                    onChangeText={(val) => updateForm('washing_rec', val)}
                />
                <GroupedInputItem
                    label='Kategori'
                    placeholder='Hue, vinter'
                    icon={Tag}

                    // value={project?.category?.map((cat) => (
                    //         <Text key={cat}>#{cat}</Text>
                    //     ))}
                />
                <Button
                    icon={Image}
                    onPress={() => setCameraOpen(true)}>
                    <Text>Tag et billede af dit projekt</Text>
                </Button>
                {isCameraOpen && (
                    <Camera
                        onCapture={({ uri }) => handleCapture(uri)}
                        onVideoCapture={({ uri, type }) => {
                            console.log('Video captured:', uri, type);
                        }}
                        onClose={() => {
                            setCameraOpen(false);
                        }}
                    />
                )}


            </GroupedInput>
            </ScrollView>
            <Button onPress={() => handleSave()}>Gem</Button>
        </SafeAreaView>
    );
}


