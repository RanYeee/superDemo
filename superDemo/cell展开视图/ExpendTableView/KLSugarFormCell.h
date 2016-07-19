//
//  KLSugarFormCell.h
//  kinglianHealthUser
//
//  Created by Ducky on 16/1/6.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface KLSugarFormCell : UITableViewCell
@property (strong, nonatomic) IBOutlet UILabel *dateTimeLabel;
@property (strong, nonatomic) IBOutlet UILabel *beforeBreLabel;
@property (strong, nonatomic) IBOutlet UILabel *afterBreLabel;
@property (strong, nonatomic) IBOutlet UILabel *beforeLunLabel;
@property (strong, nonatomic) IBOutlet UILabel *afterLunLabel;
@property (strong, nonatomic) IBOutlet UILabel *beforeDinLabel;
@property (strong, nonatomic) IBOutlet UILabel *afterDinLabel;
@property (strong, nonatomic) IBOutlet UILabel *beforeSleepLabel;

@end
