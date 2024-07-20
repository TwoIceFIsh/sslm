"use client"
import React from 'react';
import {Button} from "@/components/ui/button";
import {createEmptyTemplate} from "@/app/sslm/template/edit/[tId]/actions/new-template";

const NewButton = () => {
    const newTemplate = async () => {
        await createEmptyTemplate()
    }
    return (
        <Button onClick={newTemplate}>
            등록/추가
        </Button>
    );
};

export default NewButton;