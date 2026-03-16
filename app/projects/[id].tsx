import {ProjectForm} from "@/components/ui/ProjectForm";
import {useLocalSearchParams} from "expo-router";


export default function EditScreen() {

    const {headline} = useLocalSearchParams();


    if (headline === 'Opret et nyt projekt') {
        return (
            <ProjectForm headline={"Opret et nyt projekt"}></ProjectForm>
        )
    } else {
        return (
            <ProjectForm headline={"Rediger projekt"}></ProjectForm>
        )
    }
}