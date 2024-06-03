import { useParams } from 'react-router-dom';
import styles from './editWork.module.scss';
// import {  } from './';


export const EditWorkPage: React.FC = () => {
    const { id } = useParams();

    return <div className={styles['edit-work']}>
        {`Edit work ${id}`}
    </div>
};