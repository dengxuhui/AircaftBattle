# AircaftBattle
练习：使用layabox做飞机大战

1.UI管理器  UI管理器使用MVC架构，外部调用通过UICenter进行open或者close
当前的UI控制器并没有事件派发的机制

2.Master存储所有玩家数据，存在localStorage中

3.图集管理器需要所管理的图集命名规范按照如下进行： 图集中只存.png格式图片
    属性名 _+ 属性id _ + _ + type _ +typeID     ex：enemy_10_type_0