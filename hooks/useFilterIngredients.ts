import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

interface ReturnProps {
	ingredients: Ingredient[];
	loading: boolean;
}

export const useFilterIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Api.ingredients
			.getAll()
			.then(ingredients => {
				setIngredients(ingredients);
			})
			.catch(err => console.error(err))
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return { ingredients, loading };
};
