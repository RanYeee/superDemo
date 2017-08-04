//
//  RNInputHistoryListView.h
//  SuperDemo
//
//  Created by Rany on 2017/7/10.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol RNInputHistoryListViewDelegate <NSObject>

- (void)didSelectAtIndex:(NSInteger )index Object:(NSString *)selectObject;

@end

@interface RNInputHistoryListView : UIView


/**
 输入历史数组（字符串）
 */
@property(nonatomic, strong) NSArray *inputArray;

@property(nonatomic, weak) id <RNInputHistoryListViewDelegate>delegate;

@end
