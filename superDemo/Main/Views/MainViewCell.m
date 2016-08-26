//
//  MainViewCell.m
//  SuperDemo
//
//  Created by Rany on 16/8/22.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "MainViewCell.h"

@implementation MainViewCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code

}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

+ (instancetype)loadFromXib
{
    
    return [[[NSBundle mainBundle]loadNibNamed:NSStringFromClass(self) owner:self options:nil]firstObject];
}


- (IBAction)longPressAction:(id)sender {
    
    NSLog(@"longPress");
}

@end
