const template = (`'use client';
import route from '../routes';
import {Suspense, lazy} from 'react';
import Container from 'aio-global-ui/atoms/container';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
//import 'aio-app-scss-pages/home/page.scss';

const Loader = () => {
    return <></>;
};

const Page404 = () => {
    return (
        <>
            <p>Page not found</p>
        </>
    )
}

const Home = () => {
    return (
        <>
            <p>Home page</p>
        </>
    )
}

const App = () => {
    const getComp = (route, comp) => {
        window.go = route.history;
        helpers.react.route.history = route.history;
        return helpers.react.route.props.get(route, comp);
    };

    const routes = (arg) => {
        return arg.map((item, i) => {
            const Comp = lazy(() =>  import(/*webpackChunkName:"[request]"*/ ${"`${item.view}`"}));

            return (
                <Route
                    exact
                    path={'/'+item.path}
                    key={helpers.random.key()}
                    component={(props) => {
                        return (
                            <Suspense fallback={<Loader />}>
                                <Comp router={getComp(props, item)} auth={helpers.auth.details.get()} />
                            </Suspense>
                        )
                    }}
                />
            );
        });
    };

    const buildRoute = () => {
        return routes(helpers.react.route.builder.init(route));
    };

    const ui = () => {
        return (
            <>
                <div className="full adlLandscapeview hide">
                    <div className="landscapeImg" />
                    <p className="full ac fm-rb fs-18 mr-b10">Please rotate your device</p>
                    <p className="full ac fm-rb fs-15 mr-b30 desc">We don't support landscape mode yet. Please go back to portrait mode for the best experience</p>
                </div>
                <div className="full adlPortraitview noselect">
                    <Router>
                        <Switch>
                            {buildRoute()}
                            <Route path={"/"} component={Home} />
                            <Route path={"/*"} component={Page404} />
                        </Switch>
                    </Router>
                </div>
          </>
        );
    };

    return (
        <Container cssClass="pd-n">
            {ui()}
        </Container>
    )
}

export default App;`)


const create = async (appConfig, req, res, next) => {
    let url = `${req.helpers.json.val(appConfig, 'dirs.categoryDir')}/app.jsx`;
        await req.helpers.file.writer.async.write(url, template);
    
    return appConfig;
}

exports.create = create;