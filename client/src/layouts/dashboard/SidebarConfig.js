// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import SvgIconStyle from "../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name) => (
    <SvgIconStyle
        src={`/static/icons/navbar/${name}.svg`}
        sx={{ width: "100%", height: "100%" }}
    />
);

const ICONS = {
    cart: getIcon("ic_cart"),
    mail: getIcon("ic_mail"),
    user: getIcon("ic_user"),
    dashboard: getIcon("ic_dashboard")
};

const sidebarConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: "general",
        items: [
            {
                title: "app",
                path: PATH_DASHBOARD.general.app,
                icon: ICONS.dashboard
            }
        ]
    },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
        subheader: "management",
        items: [
            // MANAGEMENT : USER
            {
                title: "user",
                path: PATH_DASHBOARD.user.root,
                icon: ICONS.user,
                children: [
                    { title: "profile", path: PATH_DASHBOARD.user.profile },
                    { title: "Users", path: PATH_DASHBOARD.user.list }
                    // { title: "create", path: PATH_DASHBOARD.user.newUser }
                    // { title: "edit", path: PATH_DASHBOARD.user.editById }
                ]
            }
        ]
    }
];

export default sidebarConfig;
