//
//  KLFormHeaderView.h
//  kinglianHealthUser
//
//  Created by Ducky on 16/1/6.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface KLFormHeaderView : UIView

+ (instancetype)makeFormHeaderView;

@property (strong, nonatomic) IBOutlet UITableView *tableview;

@property (nonatomic ,strong) NSArray *listArray;

@end
