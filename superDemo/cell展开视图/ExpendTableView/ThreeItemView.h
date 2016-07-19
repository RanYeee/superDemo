//
//  ThreeItemView.h
//  BloodTest
//
//  Created by Ducky on 16/4/7.
//  Copyright © 2016年 kinglian. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ThreeItemView : UIView

+ (instancetype)creatThreeItemView;

@property (weak, nonatomic) IBOutlet UITableView *tableView;
@end
