import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { EButton, EPage, EModal, ENavbar } from '../../components'

import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super()
    this.state = {
      noMore: false,
      hasMore: true,
      scrollTop: 0
    }
  }

  componentWillMount() { }

  componentDidMount() {
    Taro.eventCenter.trigger('ERefreshStart')
    // 模拟请求
    setTimeout(() => {
      Taro.eventCenter.trigger('ERefreshEnd')
      this.setState({
        hasMore: true
      })
    }, 1000)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  refresh = () => {
    this.setState({
      refreshStatus: 1
    })
    Taro.showToast({
      title: '刷新',
      icon: 'none'
    })
    // 模拟请求
    setTimeout(() => {
      this.setState({
        refreshStatus: 2
      })
    }, Math.random() * 1000)
  }
  refreshLater = () => {
    setTimeout(() => {
      this.refresh()
    }, 1000)
  }

  loadMore = () => {
    setTimeout(() => {
      this.setState({
        hasMore: false,
        noMore: true
      })
    }, 1000)
  }

  openModel = () => {
    this.setState({
      open: true
    })
  }

  hideModal = () => {
    this.setState({
      open: false
    })
  }

  toTop = () => {
    this.setState({
      scrollTop: 0
    })
  }

  handleScrollEnd = (e) => {
    this.setState({
      scrollTop: e.detail.scrollTop
    })
  }

  goBack = () => {
    return true
  }
  render() {
    const { noMore, hasMore, refreshStatus, open, scrollTop } = this.state
    const header = <View className='header-container'>
      <ENavbar leftText='返回' rightText='Model' onClickRightText={this.openModel} onClickLeft={this.goBack} >首页</ENavbar>
    </View>
    const footer = <View className='footer-container'>
      <EButton outline circle onClick={this.refreshLater}>1秒后显示刷新</EButton>
    </View>
    const refresherConfig = {
      recoverTime: 300,
      refreshTime: 1000
    }
    return (
      <View>
        <EModal openModel={open} position='right' onHide={this.hideModal}>
          <View>model</View>
        </EModal>
        <EPage
          renderHeader={header}
          renderFooter={footer}
          onRefresh={this.refresh}
          onLoadMore={this.loadMore}
          noMore={noMore}
          hasMore={hasMore}
          hasMoreText='loading'
          refresherConfig={refresherConfig}
          refreshStatus={refreshStatus}
          scrollTop={scrollTop}
          onScrollEnd={this.handleScrollEnd}
        >
          <View className='main-container'>
            <View> Content </View>
            <EButton onClick={this.openModel}>显示modal</EButton>
            <View style={{height: '30px'}}>content</View>
            <View style={{height: '300px'}}>content</View>
            <View style={{height: '300px'}}>content</View>
            <View style={{height: '300px'}}>content</View>
            <View style={{height: '300px'}}>content</View>
            <EButton onClick={this.openModel}>显示modal</EButton>
            <EButton onClick={this.openModel}>显示modal</EButton>
            <EButton onClick={this.openModel}>显示modal</EButton>
            <EButton onClick={this.toTop}>回到顶部</EButton>
          </View>
        </EPage>
      </View>
    )
  }
}
