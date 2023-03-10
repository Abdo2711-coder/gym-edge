import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
// material
import { Card, Container, Button, Avatar, Stack } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import httpRequest from "../../utils/httpRequest";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
import useAuth from "../../hooks/useAuth";
// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import ImageBox from "../../components/ImageBox";

// ----------------------------------------------------------------------

export default function UserList() {
    const { themeStretch } = useSettings();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(true);
    const [tableData, setTableData] = useState([]);

    const deleteUser = async (id) => {
        try {
            await httpRequest({
                method: "DELETE",
                url: `users/${id}`
            });
            setUpdate(!update);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await httpRequest({
                method: "GET",
                url: "users"
            });
            const { data } = response.data;
            setTableData(data.users.filter((u) => u._id !== user._id));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getUsers();
    }, [update]);

    const columns = [
        {
            name: "#",
            selector: (row, i) => i + 1,
            sortable: false,
            width: "100px"
        },
        {
            name: "Photo",
            selector: (row) => row.photo,
            cell: (row) => (
                <>
                    <ImageBox src={"users/" + row.photo}>
                        <Avatar
                            alt={row.name}
                            src={`http://localhost:3001/img/users/${row.photo}`}
                        />
                    </ImageBox>
                </>
            ),
            sortable: true,
            width: "200px"
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            width: "200px"
        },
        {
            name: "Role",
            selector: (row) => row.role,
            sortable: true,
            width: "200px"
        },
        {
            name: "Actions",
            selector: (row) => row._id,
            cell: (row) => (
                <>
                    <Stack direction="row" spacing={2}>
                        <Button
                            onClick={() => deleteUser(row._id)}
                            size="small"
                            color="error"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            endIcon={<EditIcon />}
                            component={RouterLink}
                            to={`${PATH_DASHBOARD.user.editById}/:${row.name}/:${row._id}`}
                        >
                            Edit
                        </Button>
                    </Stack>
                </>
            ),
            sortable: false,
            width: "250px"
        }
    ];
    return (
        <Page title="User: List | Gym-Edge">
            <Container maxWidth={themeStretch ? false : "lg"}>
                <HeaderBreadcrumbs
                    heading="User List"
                    links={[
                        { name: "Dashboard", href: PATH_DASHBOARD.root },
                        { name: "User", href: PATH_DASHBOARD.user.root },
                        { name: "List" }
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_DASHBOARD.user.newUser}
                            startIcon={<Icon icon={plusFill} />}
                        >
                            New User
                        </Button>
                    }
                />

                <Card>
                    <DataTableExtensions
                        filter
                        export={false}
                        print={false}
                        columns={columns}
                        data={tableData}
                    >
                        <DataTable
                            noHeader
                            defaultSortField="id"
                            defaultSortAsc={false}
                            pagination
                            highlightOnHover
                            progressPending={loading}
                            progressComponent={<CircularProgress />}
                            paginationRowsPerPageOptions={[
                                10, 25, 50, 100, 1000
                            ]}
                            fixedHeader
                            fixedHeaderScrollHeight="500px"
                        />
                    </DataTableExtensions>
                </Card>
            </Container>
        </Page>
    );
}
