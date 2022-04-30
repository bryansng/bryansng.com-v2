import { runInAction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import { AnyObject } from '../utils/utilities.types';

// ISSUE: state is local, does not react to Parent FC's changes.
// export const useProps = <T extends AnyObject>(props: T): T => useLocalObservable(() => ({ ...props }));

export const useProps = <T extends AnyObject>(props: T): T => {
  const s = useLocalObservable(() => ({ ...props }));
  useEffect(() => {
    runInAction(() => {
      const keys = Object.keys(props) as (keyof T)[];
      for (let k of keys) {
        if (s[k] !== props[k]) s[k] = props[k];
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  return s;
};

export const useStore = useLocalObservable;
export const useStyle = useLocalObservable;
