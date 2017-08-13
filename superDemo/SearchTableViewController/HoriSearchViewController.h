//
//  HoriSearchViewController.h
//  SuperDemo
//
//  Created by Rany on 2017/8/13.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>
@class HoriSearchViewController;

@protocol HoriSearchViewControllerDelegate <NSObject>

- (void)updateSearchResultsForSearchController:(HoriSearchViewController *)searchController SearchText:(NSString *)searchText;

@end

@interface HoriSearchViewController : UISearchController


/// 在搜索文字为空时会展示的一个 view，通常用于实现“最近搜索”之类的功能。launchView 最终会被布局为撑满搜索框以下的所有空间。
@property(nonatomic, strong) UIView *launchView;

@property(nonatomic, weak) id <HoriSearchViewControllerDelegate> aDelegate;

@end
