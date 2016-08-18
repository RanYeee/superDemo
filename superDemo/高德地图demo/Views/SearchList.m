//
//  SearchList.m
//  SuperDemo
//
//  Created by Rany on 16/8/18.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "SearchList.h"


@interface SearchList()<UITableViewDelegate,UITableViewDataSource>

@property (nonatomic, strong) UITableView *tableView;

@end

@implementation SearchList

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    if (self) {

        self.tableView = [[UITableView alloc]initWithFrame:frame style:UITableViewStylePlain];
        
        self.tableView.delegate = self;
        
        self.tableView.dataSource = self;
        
        [self addSubview:self.tableView];
        
    }
    
    return self;
}


#pragma mark - tabelView delegate & dataSource



-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    return _resultArray.count;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    static NSString *cellId = @"cellId";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellId];
    
    if (!cell) {
        
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:cellId];
    }
    
    if (_resultArray.count > 0) {
        
        cell.textLabel.text = _resultArray[indexPath.row];
    }
    
    return cell;
}


-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    
}

#pragma mark - setter

-(void)setResultArray:(NSArray *)resultArray
{
    _resultArray = resultArray;
    
    NSLog(@">>>>>>> %@",resultArray);
    
    [self.tableView reloadData];
}

@end
