import styles from './footer.module.scss';

import { Title } from '@/shared/ui/Title';
import { Paragraph } from '@/shared/ui/Paragraph';

import { SocialIcon } from '@/shared/ui/SocialIcon';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer: React.FC = () => {
    return <footer className={styles.footer}>
        <div className={styles['content-holder']}>
            <div className={styles['info-block']}>
                <Title color='white'>_Berdovskiy</Title>
                <Paragraph color='#BCBCBC'>Это мой сайт-портфолио, я благодарю вас за то, что вы посмотрели его до конца, по всем вопросам и предложениям писать в <a className={styles['telegram-link']} href="https://t.me/yeegie">telegram</a>.</Paragraph>
                <div className={styles['social-holder']}>
                    <SocialIcon href='https://t.me/yeegie'><TelegramIcon/></SocialIcon>
                    <SocialIcon href='mailto:lotus9200@gmail.com'><AlternateEmailIcon/></SocialIcon>
                    <SocialIcon href='https://github.com/yeegie'><GitHubIcon/></SocialIcon>
                </div>
            </div>
            <div className={styles['link-block']}>
                <Title color='white'>Ссылки</Title>
                {/* FOOTER LIST */}
            </div>
        </div>
        <img className={styles['footer-line']} src="/footer.png" />
    </footer>
}