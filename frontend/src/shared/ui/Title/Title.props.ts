enum AvaiableStyles {
    variant1 = 'variant1',
    variant2 = 'variant2',
    variant3 = 'variant3',
}

export interface TitleProps {
    size?: 1 | 2 | 3 | 4 | 5 | 6
    color?: string
    styleVariant?: AvaiableStyles
    anchor?: string
    children: React.ReactNode
}
