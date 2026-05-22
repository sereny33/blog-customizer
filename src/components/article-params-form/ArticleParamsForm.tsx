import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import {
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	changeState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ changeState }: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef(null);
	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onChange: setIsOpen,
	});

	const [formState, setFormState] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		fontSizeOption: defaultArticleState.fontSizeOption,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	const handleFormChange =
		(key: keyof typeof formState) => (option: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[key]: option,
			}));
			console.log(formState);
		};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		changeState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		changeState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={styles.container + ` ${isOpen && styles.container_open}`}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFormChange('fontFamilyOption')}
						title='Шрифт'></Select>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFormChange('fontSizeOption')}
						title='Размер шрифта'></RadioGroup>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFormChange('fontColor')}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleFormChange('backgroundColor')}
						title='Цвет фона'></Select>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleFormChange('contentWidth')}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
