import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs:React.FC = () => {
  const location = useLocation();
  let currentLink = '';
  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;
      const crumbsName = crumb[0].toUpperCase() + crumb
        .replaceAll('-', ' ').slice(1);

      return (
        <div className={styles.crumb} key={crumb}>
          <Icon className={styles.iconArrow} id="arrow-right" />
          <Link to={currentLink}>{crumbsName}</Link>
        </div>
      );
    });

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.iconWrapper}>
        <Icon className={styles.icon} id="home" />
      </Link>
      {crumbs}
    </div>
  );
};
