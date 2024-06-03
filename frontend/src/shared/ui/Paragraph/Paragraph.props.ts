enum AvaiableVariant {
    Paragraph1 = 'paragraph1'
}

export interface ParagraphProps {
    fontSize?: string
    color?: string
    styleVariant?: AvaiableVariant
    frozen?: boolean
    bold?: boolean
    children: React.ReactNode
}