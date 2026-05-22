import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import {
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [formState, setFormState] = useState({
		font: fontFamilyOptions[0],
		fontColor: fontColors[0],
		fontSize: fontSizeOptions[0],
		bgColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	});

	const hangleFormChange =
		(key: keyof typeof formState) => (option: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[key]: option,
			}));
			console.log(formState);
		};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={styles.container + ` ${isOpen && styles.container_open}`}>
				<form className={styles.form}>
					<Text as={'h2'} size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={formState.font}
						options={fontFamilyOptions}
						onChange={hangleFormChange('font')}
						title='Шрифт'></Select>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSize}
						onChange={hangleFormChange('fontSize')}
						title='Размер шрифта'></RadioGroup>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={hangleFormChange('fontColor')}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						selected={formState.bgColor}
						options={backgroundColors}
						onChange={hangleFormChange('bgColor')}
						title='Цвет фона'></Select>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={hangleFormChange('contentWidth')}
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
