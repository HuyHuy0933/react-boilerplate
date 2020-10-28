import { sliceKey, reducer, actions } from './slice';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostList, selectIsLoading } from './selectors';
import { watchPostList } from './saga';
import React, { useEffect, useState, useMemo } from 'react';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

export function PostsList() {
    useInjectReducer({ key: sliceKey, reducer: reducer });
    useInjectSaga({ key: sliceKey, saga: watchPostList });

    const posts = useSelector(selectPostList);
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch();

    const [count, setCount] = useState(0);

    useEffect(() => {
    }, [])


    const renderedPosts = useMemo(() => posts.map(post => (
        <div className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)} {console.log('huy')}</p>
        </div>
    )), [posts]);

    const onClick = () => {
        dispatch(actions.loadPostList());
    }

    const onCount = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <h2>Posts</h2>
            {renderedPosts}

            {count}
            {/* {isLoading && <LoadingIndicator small />} */}
            <button type="button" onClick={onClick}>Click</button>
            <button type="button" onClick={onCount}>Count</button>
        </div>
    );
}
