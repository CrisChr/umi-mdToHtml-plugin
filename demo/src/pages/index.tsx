import { useEffect } from 'react';
import styles from './index.less';
import {mdToHtml} from 'umi';

export default function IndexPage() {
  useEffect(() => {
    document.getElementById('md-content')!.innerHTML = mdToHtml()
  }, [])
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <div id='md-content'>
      </div>
    </div>
  );
}
