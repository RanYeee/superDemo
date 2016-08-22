//
//  MainViewCell.h
//  SuperDemo
//
//  Created by Rany on 16/8/22.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface MainViewCell : UITableViewCell
@property (strong, nonatomic) IBOutlet UIImageView *boxImageView;

@property (strong, nonatomic) IBOutlet UILabel *contentTextLabel;


+ (instancetype)loadFromXib;

@end
