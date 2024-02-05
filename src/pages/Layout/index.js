import { useDispatch } from 'react-redux'
import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate,useLocation } from 'react-router-dom'
import { getUserInfo } from '@/utils'
import { clearUserInfo } from '@/store/modules/user'



const { Header, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/home',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/Article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onMenuClick = (route) => {
        const path = route.key;
        navigate(path)
    }

    // 获取用户信息
    const userInfo = getUserInfo();
    const username = userInfo ? userInfo.name : '';

    //退出登录确认回调
    const onConfirm = () => {
        dispatch(clearUserInfo())
        navigate('/login')
    }
    // 高亮
    // 1. 获取当前路由路径
    const location = useLocation()
    console.log(location.pathname)
    const selectedkey = location.pathname
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{username}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['/home']}
                        selectedKeys={selectedkey}
                        items={items}
                        onClick={onMenuClick}
                        style={{ height: '100%', borderRight: 0 }}>
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    {/* 二级路由出口 */}
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout