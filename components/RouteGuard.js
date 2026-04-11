import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';
import { isAuthenticated } from '@/lib/authenticate';

// "/" is removed, "/register" and "/about" are added
const PUBLIC_PATHS = ['/login', '/register', '/about'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    // Required async function to sync atoms with the backend
    async function updateAtom() {
        setFavouritesList(await getFavourites());
    }

    useEffect(() => {
        // 1. Invoke updateAtom at the beginning to handle refreshes
        if (isAuthenticated()) {
            updateAtom();
        }

        // 2. Run the authentication check
        authCheck(router.pathname);

        // 3. Set up listeners for route changes
        router.events.on('routeChangeComplete', authCheck);

        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    }

    return authorized ? <>{props.children}</> : null;
}