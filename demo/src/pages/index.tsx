import { useEffect } from 'react';
import {mdToHtml} from 'umi';
import styles from './index.less';

export default function IndexPage() {
  useEffect(() => {
    document.getElementById('md-content')!.innerHTML = mdToHtml()
  }, [])
  return (
    <div id='md-content' className={styles.container}>
    </div>
  );
}
