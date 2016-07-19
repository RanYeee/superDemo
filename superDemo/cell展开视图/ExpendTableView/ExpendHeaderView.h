//
//  ExpendHeaderView.h
//  myApp
//
//  Created by IMac on 16/4/6.
//  Copyright © 2016年 IMac. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ExpendHeaderView : UIView

/**
 *  初始化cell头视图
 *
 *  @param frame   Rect
 *  @param title   左边标题
 *  @param infoArr 数据数组 [正常率、正常次数、异常次数]
 *  @param isShow  数据是否可见
 *
 *  @return ExpendHeaderView对象
 */
- (instancetype)initWithFrame:(CGRect)frame
                     andTitle:(NSString *)title
                   andInfoArr:(NSArray *)infoArr
                       isShow:(BOOL)isShow;


@end
