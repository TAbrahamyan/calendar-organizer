import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

const Footer: React.FC = React.memo(() => {
  return (
    <footer>
      <h1>
        Created by <a href="https://github.com/TAbrahamyan" target="_blank"><GithubOutlined />TAbrahamyan</a>
      </h1>
    </footer>
  );
});

export default Footer;
