'use client';

import { cn } from '@/lib/utils';
import { Api } from '@/services/api-slient';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

interface Props {
	className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [focused, setFocused] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [products, setProducts] = useState<Product[]>([]);
	const ref = useRef<HTMLDivElement>(null);

	useClickAway(ref, () => {
		setFocused(false);
	});

	useEffect(() => {
    if (!searchQuery) return;
		Api.products
			.search(searchQuery)
			.then(products => setProducts(products))
			.catch(err => console.error(err));
	}, [searchQuery]);

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  }

	return (
		<>
			{focused && (
				<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
			)}
			<div
				ref={ref}
				className={cn(
					'felx rounded-2xl flex-1 justify-between relative h-11 z-30',
					className
				)}
			>
				<Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
				<input
					className="rounded-2xl outline-none w-full h-full bg-gray-50 pl-11"
					type="text"
					placeholder="Найти пиццу..."
					value={searchQuery}
					onFocus={() => setFocused(true)}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				<div
					className={cn(
						'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 opacity-0 z-30',
						focused && 'visible opacity-100 top-12'
					)}
				>
					{products.length > 0 ? products.map(product => (
						<Link
							key={product.id}
							href={`/product/${product.id}`}
							className="flex items-center gap-3 mx-2 rounded-sm px-3 py-2 hover:bg-gray-600/10 cursor-pointer"
              onClick={onClickItem}
						>
							<img
								className="rounded-sm h-8 w-8"
								src={product.imageUrl}
								alt={product.name}
							/>
							<span>{product.name}</span>
						</Link>
					)) : <div className='mx-2 rounded-sm px-3 py-2 bg-gray-600/10'>{!searchQuery ? 'Начните вводить название' : 'Не найдено'}</div>}
				</div>
			</div>
		</>
	);
};
