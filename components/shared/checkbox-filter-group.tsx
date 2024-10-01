'use client';

import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Button, Input } from '../ui';

type Item = FilterChecboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	onChange?: (values: string[]) => void;
	defaultValue?: string[];
	className?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	onChange,
	defaultValue,
	className,
}) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const list = showAll
		? items.filter(item =>
				item.text.toLocaleLowerCase().includes(searchValue.toLowerCase())
		  )
		: defaultItems.slice(0, limit);

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
						onChange={onChangeSearchInput}
					/>
				</div>
			)}

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{list.map((item, index) => (
					<FilterCheckbox
						text={item.text}
						value={item.value}
						key={index}
						endAdornment={item.endAdornment}
						checked={false}
						onCheckedChange={id => console.log(id)}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						onClick={() => setShowAll(prev => !prev)}
						className="text-primary mt-3"
					>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	);
};
