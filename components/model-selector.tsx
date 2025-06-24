"use client";

import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { MODELS_LABELS } from "@/constants";

type Model = (typeof MODELS_LABELS)[number]["value"];

interface ModelSelectorProps {
	value?: Model;
	onValueChange?: (value: Model) => void;
}

export default function ModelSelector({
	value,
	onValueChange,
}: ModelSelectorProps) {
	const [selectedModel, setSelectedModel] = useState<Model>(
		value || "deepseek-r1"
	);

	const handleValueChange = (newValue: Model) => {
		setSelectedModel(newValue);
		onValueChange?.(newValue);
	};

	return (
		<Select value={selectedModel} onValueChange={handleValueChange}>
			<SelectTrigger className="w-[140px] h-8 bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
				<SelectValue placeholder="Select model" />
			</SelectTrigger>
			<SelectContent>
				{MODELS_LABELS.map((model) => (
					<SelectItem key={model.value} value={model.value}>
						{model.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
