//
//  ThreeItemCellTableViewCell.m
//  BloodTest
//
//  Created by Ducky on 16/4/7.
//  Copyright © 2016年 kinglian. All rights reserved.
//

#import "ThreeItemCellTableViewCell.h"

@implementation ThreeItemCellTableViewCell

+ (instancetype)creatThreeItemCell{
    return [[[NSBundle mainBundle]loadNibNamed:@"ThreeItemCellTableViewCell" owner:self options:nil]lastObject];
}

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
