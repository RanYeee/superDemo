//
//  RNSelectedTextfield.h
//  SuperDemo
//
//  Created by Rany on 2017/7/7.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

static NSString *const kInputHistoryList = @"kInputHistoryList";

@interface RNSelectedTextfield : UIView

@property(nonatomic, strong) UITextField *textField;


/**
 是否显示右边的选择按钮
 */
@property(nonatomic, assign) BOOL isShowRightButton;


/**
 是否自动显示输入记录列表
 */
@property(nonatomic, assign) BOOL isAutoShowHistoryList;


/**
 是否自动保存记录
 */
@property(nonatomic, assign) BOOL autoSaveCache;


/**
 保存记录数限制
 */
@property(nonatomic, assign) NSInteger cacheInputTextLimit;

/**
 手动保存输入记录
 */
- (void)saveInputCache;


/**
 隐藏输入记录列表
 */
- (void)hideHistoryList;

@end
