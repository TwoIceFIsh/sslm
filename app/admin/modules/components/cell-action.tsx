"use client";

import {useRouter} from "next/navigation";
import {MoreHorizontal, PowerIcon, PowerOffIcon} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

import {ModuleColumn} from "./Columns";
import {toast} from "sonner";

interface CellActionProps {
    data: ModuleColumn;
}

export const CellAction = ({data}: CellActionProps) => {
    const router = useRouter();

    const onActivate = async () => {
        try {
            await fetch(`/api/admin/activateModule/${data.id}`, {
                method: "POST",
            });
            router.refresh();
            toast.success("Module has been activated.");

        } catch (error) {
            toast.error("Something went wrong while activating module. Please try again.");
        }
    };

    const onDeactivate = async () => {
        try {
            await fetch(`/api/admin/deactivateModule/${data.id}`, {
                method: "POST",
            });
            router.refresh();
            toast.success("Module has been deactivated.");
        } catch (error) {
            toast.error("Something went wrong while deactivating module. Please try again.");
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onActivate()}>
                        <PowerIcon className="mr-2 w-4 h-4"/>
                        Activate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDeactivate()}>
                        <PowerOffIcon className="mr-2 w-4 h-4"/>
                        Deactivate
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};