import { useMediaQuery } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { Tabs, Tab, Badge } from '@material-ui/core'

const MyBadge = withStyles((theme) => ({
  badge: {
    right: -10,
    zIndex: 10
  },
}))(Badge)

export default function MyTabs(props) {
  const isXsScreen = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const isMdUpScreen = useMediaQuery(theme => theme.breakpoints.up('md'))

  return (
    <Tabs
      value={props.currentTab}
      onChange={(event, newValue) => props.setCurrentTab(newValue)}
      indicatorColor="primary"
      textColor="primary"
      variant={props.centered && isMdUpScreen ? 'fullWidth' : 'scrollable'}
      scrollButtons={isXsScreen ? 'on' : 'auto'}
      centered={props.centered && isMdUpScreen}
    >
      {props.tabs.map((tab, idx) => 
        <Tab 
          key={'tab'+idx} 
          value={tab.value} 
          icon={tab.icon ? 
            <MyBadge 
              badgeContent={tab.count} 
              color="primary"
              overlap="circular"
              max={9}
              invisible={!tab.count}
            >
              {tab.icon}
            </MyBadge> :
            null
          }
          style={props.style}
          label={tab.text}
        />
      )}
    </Tabs>
  )
}